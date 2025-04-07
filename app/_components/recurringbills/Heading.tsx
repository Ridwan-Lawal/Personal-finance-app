export default function Heading() {
  return (
    <div className="border-grey-100 hidden items-center border-b md:flex md:py-3">
      <p className="text-preset-5 text-grey-500 capitalize md:w-[55%]">
        bill title
      </p>

      <div className="flex items-center justify-between md:w-[45%]">
        {["due date", "amount"].map((text) => (
          <p key={text} className="text-preset-5 text-grey-500 capitalize">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
