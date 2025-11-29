export default function WeekRow() {
  return (
    <tr>
      {new Array(7).fill(null).map((_, index) => (
        <td key={index} />
      ))}
    </tr>
  );
}
