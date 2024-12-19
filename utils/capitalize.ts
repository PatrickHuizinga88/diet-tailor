export default function capitalize(s: string) {
  return s.replace(/\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}