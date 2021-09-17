const toFormat = (number) => {
    const formatter = new Intl.NumberFormat("en-ES", {
        style: "currency",
        currency: "USD"
    });

    return formatter.format(number | 0);
}

const toTime = (time) => {
    if (time !== String) {
        time = "0"
    }
    while (time.length < 6) {
        time = '0' + time
    }
    return String(`${time.slice(0, 2)} : ${time.slice(2, 4)} : ${time.slice(4, 6)}`)
}
const formServicio = [{
        name: 'name',
        placeholder: 'Nombre',
        type: 'text',
        options: {
            required: "Este campo es requerido"
        }
    },
    {
        name: 'price',
        placeholder: 'Precio',
        type: 'number',
        format: toFormat,
        options: {
            required: "Este campo es requerido",
            valueAsNumber: "Escriba un numero de télefono valido",
            maxLength: {
                value: 8,
                message: 'Demasiado dinero'
            }
        }
    },
    {
        name: 'time',
        placeholder: 'Tiempo',
        type: 'number',
        format: toTime,
        options: {
            required: "Este campo es requerido",
            valueAsNumber: "Escriba un numero de télefono valido",
            value: ""
        }

    }
]
export { formServicio }