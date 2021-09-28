const toFormat = (number) => {
    const formatter = new Intl.NumberFormat("en-ES", {
        style: "currency",
        currency: "USD"
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
        return `${time.slice(0, 2)} h : ${time.slice(2, 4)} m : ${time.slice(4, 6)} s`
    } catch {
        return "0"
    }
}
const formServicio = [{
        name: 'name',
        placeholder: 'Nombre',
        type: 'text',
        options: {
            required: "Este campo es requerido",
        }
    },
    {
        name: 'price',
        placeholder: 'Precio',
        type: 'text',
        format: toFormat,
        options: {
            required: "Este campo es requerido",
            maxLength: { value: 10, message: "Hay demasiados números" },
            pattern: {
                value: /^([0-9]*)$/,
                message: "Ingrese un número valido."
            }
        }
    },
    {
        name: 'length',
        placeholder: 'Duración',
        type: 'text',
        format: toTime,
        options: {
            required: "Este campo es requerido",
            pattern: {
                value: /^([0-9]*)$/,
                message: "Ingrese un número valido para el tiempo ej: 3000 = 00:30:00"
            }
        }

    },
    {
        name: 'enable',
        placeholder: 'Activo',
        type: 'checkbox',
        options: {
            value: true
        }
    }
]
export { formServicio, toFormat, toTime }