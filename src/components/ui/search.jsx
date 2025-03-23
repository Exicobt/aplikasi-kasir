import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

const Search = ({ placeholder }) => {
    return(
        <div className="flex relative">
            <MagnifyingGlass size={18} className="absolute bottom-[25%] left-3" />
            <input
            type="text"
            placeholder={`Search ${placeholder}`}
            className="w-[200px] pl-12  py-1 box-border focus:border outline-none rounded-sm"
            />
        </div>
    )
}

export default Search