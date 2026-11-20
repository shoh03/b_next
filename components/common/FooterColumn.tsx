interface FooterColumnProps {
    title: string;
    items: string[];
}

export default function FooterColumn({ title, items }: FooterColumnProps) {
    return (
        <div>
            <h4 className="mb-4 text-sm font-bold text-[#3ddcc6]">{title}</h4>
            <ul>
                {items.map((item) => (
                    <li key={item} className="mb-2.5 text-[15px]">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
