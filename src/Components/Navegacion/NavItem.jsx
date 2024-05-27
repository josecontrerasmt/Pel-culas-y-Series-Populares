export default function NavItem({item,ocultarGeneros,ocultarWatch}) {
  return (
    <li>
      <button onClick={ocultarGeneros}
        className="flex items-center py-1 px-3"
      >
        <i className={`${item} text-2xl`}></i>
      </button>
    </li>
  );
}
