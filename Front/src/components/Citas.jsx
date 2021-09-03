import React, { useState } from 'react';
import Calendar from 'react-calendar';

const Citas = () => {

    const [date, setDate] = useState(new Date());
    return (
        <div>

            <p>Soy la pagina de inicio</p>
            <Calendar
                onChange={setDate}
                value={date}
            />
            {console.log(date)}

        </div>
    );

}

export default Citas;