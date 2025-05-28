import React from 'react'

const LocationMap = ({ map }: { map: string | undefined }) => {
    return (
        <div>
            <iframe src={map} width="100%" height="0" style={{ border: "0" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default LocationMap