import Widget from "./Widget";

export default function Category({ category, setOpenAddWidget, setSelectedCategory }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {category.name}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.widgets.map(
          (widget, idx) =>
            widget.visible && (
              <Widget
                key={idx}
                categoryName={category.name}
                widget={widget}
              />
            )
        )}

        {/* Inline Add Widget  */}
        <button
          onClick={() => {
            setSelectedCategory(category.name);
            setOpenAddWidget(true); 
          }}
          className="border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500"
        >
          + Add Widget
        </button>
      </div>
    </div>
  );
}
