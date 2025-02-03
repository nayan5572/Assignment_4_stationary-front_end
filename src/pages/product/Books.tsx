import CategoryItem from "../../components/ui/CategoryItem";


const Books = () => {
    return (
        <div className="py-24 bg-[#F9F9FB] px-6 md:px-40">
            <h1 className="text-[20px] font-bold text-center !mb-10">All Books</h1>
            <CategoryItem item="Books" />
        </div>
    );
};

export default Books;