export default function TransactionHeader() {
  return (
    <div className="hidden grid-cols-5 gap-8 py-4 md:grid">
      {["recipient / sender", "category", "transaction date", "amount"].map(
        (text, id, arr) => (
          <p
            className={`${id === 0 && "col-span-2"} ${id === arr.length - 1 && "justify-self-end"} text-preset-5 text-grey-500 border capitalize`}
            key={text}
          >
            {text}
          </p>
        ),
      )}
    </div>
  );
}
