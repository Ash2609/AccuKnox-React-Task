import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget } from "../store/dashboardSlice";

export default function AddWidget({ open, setOpen, selectedCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.dashboard.categories);

  const [categoryName, setCategoryName] = useState(
    selectedCategory || (categories[0]?.name ?? "")
  );
  const [title, setTitle] = useState("");
  const [type, setType] = useState("donut");
  const [data, setData] = useState([{ name: "", value: "" }]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAddDataRow = () =>
    setData([...data, { name: "", value: "" }]);

  const handleDataChange = (i, field, value) => {
    const newData = [...data];
    newData[i][field] = value;
    setData(newData);
  };

  const handleSave = () => {
    if (!categoryName || !title) return;

    const parsedData = data
      .filter((d) => d.name && d.value)
      .map((d) => ({ ...d, value: parseInt(d.value, 10) }));

    dispatch(
      addWidget({
        categoryName,
        widget: {
          title,
          type,
          visible: true,
          data: parsedData,
          total: parsedData.reduce((a, b) => a + b.value, 0),
          colors: ["#dc2626", "#f97316", "#facc15", "#9ca3af", "#3b82f6", "#10b981"],
        },
      })
    );

    setTitle("");
    setType("donut");
    setData([{ name: "", value: "" }]);
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full max-w-md bg-white shadow-xl h-full overflow-y-auto">
              <div className="p-6 space-y-6">
                <Dialog.Title className="text-lg font-semibold">
                  Add Widget
                </Dialog.Title>

                {/* Add Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Widget Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                  />
                </div>

                {/* Add Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                  >
                    <option value="donut">Donut Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="empty">Empty</option>
                  </select>
                </div>

                {/* Add Data */}
                {type !== "empty" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data
                    </label>
                    {data.map((row, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Label"
                          value={row.name}
                          onChange={(e) =>
                            handleDataChange(i, "name", e.target.value)
                          }
                          className="flex-1 border rounded-lg p-2 text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Value"
                          value={row.value}
                          onChange={(e) =>
                            handleDataChange(i, "value", e.target.value)
                          }
                          className="w-24 border rounded-lg p-2 text-sm"
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleAddDataRow}
                      className="text-blue-600 text-sm mt-1"
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
