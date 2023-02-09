/**
 * Method to get current timestamp
 * @returns The current system time
 */
export default function getTimestamp() {
  let d = new Date();
  return d.getTime();
}