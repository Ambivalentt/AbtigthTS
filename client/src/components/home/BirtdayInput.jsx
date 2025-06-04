import React, { useEffect, useState } from "react";

export default function BirthdaySelector({ onChange, value, required = false }) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState("");
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    useEffect(() => {
        if (value && !initialized) {
            const [y, m, d] = value.split("-");
            setYear(y);
            setMonth(String(Number(m)));
            setDay(String(Number(d)));
            setInitialized(true);
        }
    }, [value, initialized]);

    useEffect(() => {
        if (day && month && year) {
            const formattedMonth = String(Number(month)).padStart(2, "0");
            const formattedDay = String(Number(day)).padStart(2, "0");
            const birthday = `${year}-${formattedMonth}-${formattedDay}`;
            onChange(birthday);
            setError(""); // limpia error si todo está bien
        } else if (required) {
            onChange(""); // envía string vacío si falta algo
        }
    }, [day, month, year]);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-2">
                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="bg-[#0e0e10] border border-[#2a2a2e] text-white p-2 rounded-md w-1/3"
                >
                    <option value="" disabled hidden>Mes</option>
                    {months.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                    ))}
                </select>

                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="bg-[#0e0e10] border border-[#2a2a2e] text-white p-2 rounded-md w-1/3"
                >
                    <option value="" disabled hidden>Día</option>
                    {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-[#0e0e10] border border-[#2a2a2e] text-white p-2 rounded-md w-1/3"
                >
                    <option value="" disabled hidden>Año</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
