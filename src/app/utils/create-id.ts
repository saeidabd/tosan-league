export function CreateID() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 8);
  const newId = `${timestamp}-${randomPart}`;
  return newId;
}
