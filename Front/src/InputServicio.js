const toFormat = (number) => {
    const formatter = new Intl.NumberFormat("en-ES", {
        style: "currency",
        currency: "COP"
    });
    if (number < 0) {
        number = 0
    }
    return formatter.format(number | 0);
}

const toTime = (time) => {
    !time && (time = "0")
    time = time.toString()
    while (time.length < 6 && time.length > 0) {
        time = '0' + time
    }
    try {
        return `${time.slice(0, 2)} : ${time.slice(2, 4)} : ${time.slice(4, 6)}`
    } catch {
        return "0"
    }
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
            pattern: {
                value: /^[0-9]$/,
                message: "Ingrese un nombre valido."
            }
        }
    },
    {
        name: 'time',
        placeholder: 'Duración',
        type: 'number',
        format: toTime,
        options: {
            required: "Este campo es requerido",
            valueAsNumber: "Escriba un numero de télefono valido",
        }

    },
    {
        name: 'active',
        placeholder: 'Activo',
        type: 'checkbox',
        options: {
            value: true
        }
    }
]
export { formServicio }