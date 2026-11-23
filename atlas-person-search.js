/* Ancestry Atlas person search. Read-only: never changes evidence or relationships.
   Full/prefix/substring matches win; typo suggestions are only a fallback. */
(function (scope) {
  'use strict';
  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[øØ]/g, 'o').replace(/[æÆ]/g, 'ae')
      .replace(/[ß]/g, 'ss').replace(/[łŁ]/g, 'l')
      .replace(/[ðÐ]/g, 'd').replace(/[þÞ]/g, 'th')
      .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
  }
  function strings(value) {
    if (Array.isArray(value)) return value.filter(v => typeof v === 'string');
    return typeof value === 'string' && value ? [value] : [];
  }
  function names(person) {
    return [person.name, ...strings(person.aliases), ...strings(person.alternateNames)].filter(Boolean);
  }
  function directScore(person, query) {
    const name = normalize(person.name);
    if (name === query) return 0;
    if (name.startsWith(query)) return 1;
    if (name.includes(query)) return 2;
    const allNames = names(person);
    for (const raw of allNames.slice(1)) {
      const alias = normalize(raw);
      if (alias === query || alias.startsWith(query)) return 2;
      if (alias.includes(query)) return 3;
    }
    // First name + surname must still work when a middle name is omitted.
    const tokens = query.split(' ').filter(Boolean);
    if (tokens.length > 1 && allNames.some(raw => {
      const words = normalize(raw).split(' ');
      return tokens.every(t => words.some(w => w === t || (t.length >= 3 && w.startsWith(t))));
    })) return 3;
    const context = normalize([person.years, person.place, person.branch].filter(Boolean).join(' '));
    if (context.includes(query)) return 4;
    // Preserve historical name + birth-year and name + place searches.
    return normalize([person.name,person.years,person.place,person.branch].filter(Boolean).join(' '))
      .includes(query) ? 5 : Infinity;
  }
  // Bounded Optimal String Alignment distance (includes adjacent transpositions).
  function distance(a, b, maximum) {
    if (Math.abs(a.length - b.length) > maximum) return maximum + 1;
    let before = null;
    let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const current = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        let cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
        if (before && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
          value = Math.min(value, before[j - 2] + 1);
        current[j] = value;
        rowMin = Math.min(rowMin, value);
      }
      if (rowMin > maximum) return maximum + 1;
      before = previous;
      previous = current;
    }
    return previous[b.length];
  }
  function maxDistance(token) {
    if (token.length < 4 || !/\p{L}/u.test(token)) return 0;
    return token.length <= 6 ? 1 : 2;
  }
  function closeScore(person, query) {
    const tokens = query.split(' ').filter(Boolean);
    // A short query, year, or long paragraph should never trigger loose name matches.
    if (query.length < 4 || tokens.length > 4 || tokens.every(t => !/\p{L}/u.test(t))) return Infinity;
    let best = Infinity;
    for (const variant of names(person)) {
      const candidateTokens = normalize(variant).split(' ').filter(Boolean);
      let sum = 0, ok = true;
      for (const token of tokens) {
        const allowed = maxDistance(token);
        let nearest = Infinity;
        for (const candidate of candidateTokens) {
          if (allowed === 0 && token !== candidate) continue;
          const d = distance(token, candidate, allowed);
          if (d < nearest) nearest = d;
        }
        if (nearest > allowed) { ok = false; break; }
        sum += nearest;
      }
      if (ok && sum < best) best = sum;
    }
    return best;
  }
  function search(people, rawQuery, options) {
    const query = normalize(rawQuery);
    const limit = Math.max(1, Math.min(Number(options?.limit) || 6, 10000));
    if (!query || !Array.isArray(people)) return { matches: [], approximate: false, query };
    const matches = [];
    for (const person of people) {
      if (!person || !person.name) continue;
      const score = directScore(person, query);
      if (Number.isFinite(score)) matches.push({ person, kind: 'exact', score });
    }
    if (matches.length) {
      matches.sort((a,b) => a.score - b.score || a.person.name.localeCompare(b.person.name));
      return { matches: matches.slice(0, limit), approximate: false, query };
    }
    // Never blur the distinction between a spelling suggestion and source-backed identity.
    const suggestions = [];
    for (const person of people) {
      if (!person || !person.name) continue;
      const score = closeScore(person, query);
      if (Number.isFinite(score) && score > 0) suggestions.push({ person, kind: 'close', score });
    }
    suggestions.sort((a,b) => a.score - b.score || a.person.name.localeCompare(b.person.name));
    return { matches: suggestions.slice(0, Math.min(limit, 12)), approximate: suggestions.length > 0, query };
  }
  const api = { normalize, search };
  scope.AtlasPersonSearch = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
