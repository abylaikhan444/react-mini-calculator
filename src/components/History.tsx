type HistoryProps = {
  entries: string[];
};

export default function History({ entries }: HistoryProps) {
  // TODO этап 6: нет записей → «Истории пока нет», иначе список <ul> с key
  if (entries.length === 0) {
    return <p className="history__error">Истории пока нет</p>;
  }

  return (
    <div className="history-box">
      <ul className="history-box__list">
        {entries.map((entry) => (
          <li key={entry} className="history-box__list-element">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
