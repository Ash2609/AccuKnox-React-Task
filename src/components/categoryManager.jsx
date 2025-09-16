import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  removeCategory,
  toggleWidgetVisibility,
  removeWidget,
} from "../store/dashboardSlice";

export default function CategoryManager({ open, setOpen }) {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.dashboard.categories || []);

  const [localCats, setLocalCats] = useState([]);
  const [selectedCatName, setSelectedCatName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [widgetSearch, setWidgetSearch] = useState(""); 
  const [confirmDelete, setConfirmDelete] = useState(null); // category pending deletion

  useEffect(() => {
    if (open) {
      const copy = categories.map((c) => ({
        name: c.name,
        widgets: (c.widgets || []).map((w) => ({ ...w })),
      }));
      setLocalCats(copy);
      setSelectedCatName(copy[0]?.name || "");
      setWidgetSearch("");
      setNewCategoryName("");
      setConfirmDelete(null);
    }
  }, [open, categories]);

  const selectedCategory = localCats.find((c) => c.name === selectedCatName);

  const addLocalCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    if (localCats.some((c) => c.name === name)) {
      setSelectedCatName(name);
      setNewCategoryName("");
      return;
    }
    const updated = [...localCats, { name, widgets: [] }];
    setLocalCats(updated);
    setSelectedCatName(name);
    setNewCategoryName("");
  };

  const confirmRemoveCategory = (name) => {
    setConfirmDelete(name);
  };

  const actuallyRemoveCategory = () => {
  if (confirmDelete) {
    // 🔹 Dispatch to Redux store (this is the missing part)
    dispatch(removeCategory(confirmDelete));

    // 🔹 Also update local state so modal UI updates immediately
    const updated = localCats.filter((c) => c.name !== confirmDelete);
    setLocalCats(updated);

    if (selectedCatName === confirmDelete) {
      setSelectedCatName(updated[0]?.name || "");
    }

    setConfirmDelete(null);
  }
};


  const removeWidgetLocal = (catName, widgetTitle) => {
    setLocalCats((prev) =>
      prev.map((c) =>
        c.name === catName
          ? { ...c, widgets: c.widgets.filter((w) => w.title !== widgetTitle) }
          : c
      )
    );
  };

  const toggleWidgetLocal = (catName, widgetTitle) => {
    setLocalCats((prev) =>
      prev.map((c) =>
        c.name === catName
          ? {
              ...c,
              widgets: c.widgets.map((w) =>
                w.title === widgetTitle ? { ...w, visible: !w.visible } : w
              ),
            }
          : c
      )
    );
  };

  const handleConfirm = () => {
    localCats.forEach((lc) => {
      if (!categories.some((oc) => oc.name === lc.name)) {
        dispatch(addCategory(lc.name));
      }
    });
    categories.forEach((oc) => {
      if (!localCats.some((lc) => lc.name === oc.name)) {
        dispatch(removeCategory(oc.name));
      }
    });
    localCats.forEach((lc) => {
      const orig = categories.find((c) => c.name === lc.name);
      if (!orig) return;
      orig.widgets.forEach((ow) => {
        const still = lc.widgets.find((lw) => lw.title === ow.title);
        if (!still) {
          dispatch(removeWidget({ categoryName: lc.name, widgetTitle: ow.title }));
        } else if (still.visible !== ow.visible) {
          dispatch(toggleWidgetVisibility({ categoryName: lc.name, widgetTitle: ow.title }));
        }
      });
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setLocalCats(categories.map((c) => ({ name: c.name, widgets: (c.widgets || []).map(w => ({ ...w })) })));
    setOpen(false);
  };

  const filteredWidgets =
    selectedCategory?.widgets.filter((w) =>
      w.title.toLowerCase().includes(widgetSearch.toLowerCase())
    ) || [];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>


        <div className="fixed inset-0 bg-black/20" />
        
        <div className="fixed inset-0 flex justify-end">
          <Dialog.Panel className="w-full max-w-md bg-white shadow-xl h-full overflow-y-auto">
            <div className="p-5 flex flex-col h-full">
              {/* Top input + Add button */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={addLocalCategory}
                  className="px-3 py-2 bg-blue-500 border text-white rounded text-sm"
                >
                  Add
                </button>
              </div>

              {/* Category */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {localCats.map((c) => (
                  <div
                    key={c.name}
                    className={`flex items-center gap-2 px-3 py-1  border border-gray-300 ${
                      c.name === selectedCatName
                        ? "bg-gray-500 text-white border-blue-600"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedCatName(c.name)}
                      className="text-sm"
                    >
                      {c.name}
                    </button>
                    <button
                      onClick={() => confirmRemoveCategory(c.name)}
                      className="text-xs text-red-500 hover:text-red-700"
                      title="Remove category"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Widget listSearch */}
              <input
                type="text"
                placeholder="Search widgets in category..."
                value={widgetSearch}
                onChange={(e) => setWidgetSearch(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
                disabled={!selectedCategory}
              />

              {/* Widget list */}
              <div className="flex-1 overflow-y-auto mb-4">
                {filteredWidgets.length === 0 ? (
                  <div className="text-sm text-gray-500">No widgets found.</div>
                ) : (
                  <ul className="space-y-2">
                    {filteredWidgets.map((w) => (
                      <li
                        key={w.title}
                        className="flex items-center justify-between p-2 border border-gray-300 rounded"
                      >
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!w.visible}
                            onChange={() =>
                              toggleWidgetLocal(selectedCategory.name, w.title)
                            }
                          />
                          <span className="text-sm">{w.title}</span>
                        </label>
                        <button
                          onClick={() => removeWidgetLocal(selectedCategory.name, w.title)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>

        {/* Delete confirmation modal */}
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <p className="text-gray-800 mb-4">
                Are you sure you want to delete category{" "}
                <span className="font-semibold">{confirmDelete}</span>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={actuallyRemoveCategory}
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </Transition.Root>
  );
}
