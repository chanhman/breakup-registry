export default function Page() {
  return (
    <div className="py-10 px-8">
      <h1 className="text-2xl text-slate-900 sm:text-4xl">Mary's Registry</h1>

      <form className="flex items-end gap-4 py-5" action="">
        <div className="flex-1 grid gap-2">
          <label
            className="block text-sm font-semibold leading-6 text-slate-900"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div className="flex-1 grid gap-2">
          <label
            className="block text-sm font-semibold leading-6 text-slate-900"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="number"
            name="price"
            id="price"
          />
        </div>
        <div className="flex-1 grid gap-2">
          <label
            className="block text-sm font-semibold leading-6 text-slate-900"
            htmlFor="link"
          >
            Link
          </label>
          <input
            className="block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
            name="link"
            id="link"
          />
        </div>
        <div>
          <button
            className="inline-flex justify-center bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500"
            type="submit"
          >
            Add item
          </button>
        </div>
      </form>

      <div className="">
        <div className="flex items-center justify-between py-5 text-sm leading-6 border-slate-200 border-b">
          <div className="text-lg">
            <a className="text-slate-600 hover:underline" href="">
              Item name
            </a>{' '}
            $00.00
          </div>
          <div className="flex gap-4">
            <button className="pointer-events-auto ml-4 flex-none px-2 py-[0.3125rem] font-medium text-slate-700 ring-1 ring-slate-700/10 hover:bg-slate-50">
              Edit
            </button>
            <button className="flex justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-red-500 hover:text-white hover:bg-red-500 ring-1 ring-red-500">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
