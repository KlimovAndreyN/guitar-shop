type MarkProps = {
  className: string;
}

function Mark({ className }: MarkProps): JSX.Element {
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

export default Mark;
