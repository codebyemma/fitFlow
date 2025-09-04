export async function fetchAllExercisePages(startUrl) {
  let url = startUrl;
  const all = [];
  while (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${url}`);
    const data = await res.json();
    all.push(...(data.results || []));
    url = data.next;
  }
  return all;
}

