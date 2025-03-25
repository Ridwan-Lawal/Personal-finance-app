export default function CategorySpendingSummary() {
  return (
    <div className="w-full space-y-6 border md:w-[50%] lg:w-full">
      <h2 className="text-preset-2 text-grey-900 capitalize">
        spending summary
      </h2>

      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => i + 1).map(
          (category, categoryIndex, categoryArr) => (
            <div key={categoryIndex} className="space-y-4">
              <div
                key={categoryIndex}
                className="border-green flex items-center justify-between border-l-4"
              >
                <p className="text-preset-4 text-grey-500 px-4">
                  Transportation
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-preset-3 text-grey-900">$250.00</p>
                  <p className="text-preset-5 text-grey-500">of $750.00</p>
                </div>
              </div>

              {categoryIndex !== categoryIndex - 1 && (
                <div className="border-grey-100 border-b" />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
