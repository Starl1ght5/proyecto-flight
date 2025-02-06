export default function GoogleButtonComponent () {

    return (
        <div className="flex flex-row items-center bg-white w-5/6 py-1.5 px-4 hover:cursor-pointer hover:bg-lilac duration-150 hover:text-white justify-center gap-2 border border-gray-400 rounded-lg shadow-lg">
            <span className="icon-[flat-color-icons--google] size-10" />
            <p className="text-base">Inicia sesion con Google</p>
        </div>
    )
}