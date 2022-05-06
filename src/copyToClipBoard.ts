export default async (value: string) => {
  await navigator.clipboard.writeText(value);
};
