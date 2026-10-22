type HistoryProps = {
  entries: string[];
};

export default function History({ entries }: HistoryProps) {
  if (entries.length === 0) {
    return <p className="history-box__error">Истории пока нет</p>;
  }

  return (
    <div className="history-box">
      <ul className="history-box__list">
        {entries.map((entry, index) => (
          <li key={index} className="history-box__list-element">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
