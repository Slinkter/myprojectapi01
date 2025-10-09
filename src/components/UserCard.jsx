/**
 * Este es un componente presentacional que se encarga de renderizar
 * la información de un único usuario que recibe a través de sus props.
 *
 * Optimizaciones de rendimiento:
 * - `React.memo`: Evita que el componente se vuelva a renderizar si sus props no han cambiado.
 *   Esto es crucial en una lista larga para evitar que todas las tarjetas se rendericen de nuevo
 *   cuando solo una parte de la lista cambia.
 *
 * - `useIntersectionObserver`: Utiliza un hook personalizado para detectar cuándo la tarjeta
 *   entra en el viewport, aplicando una animación de entrada solo en ese momento. Esto mejora
 *   la percepción de rendimiento y añade un efecto visual agradable.
 *
 * - `loading="lazy"` en la imagen: El navegador solo cargará la imagen del avatar cuando
 *   esté a punto de entrar en el viewport, ahorrando ancho de banda.
 */

import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    CardHeader,
} from "@material-tailwind/react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const UserCard = React.memo(({ user = {} }) => {
    const { avatar_url, login, html_url } = user;
    const cardRef = useRef(null); // Ref para el elemento de la tarjeta, usado por el Intersection Observer.

    // Hook que devuelve `true` si el elemento referenciado es visible en pantalla.
    // threshold : umbral o limite
    // threshold : 0.0 y 1.0
    /*   
    Esto significa que la variable isVisible se convertirá en true en 
    el momento exacto en que el 10% de la tarjeta UserCard aparezca 
    en el viewport (el área visible del navegador) 
    */

    const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

    // Clases de CSS condicionales para la animación de entrada.
    const cardClasses = [
        "w-full max-w-xs shadow-md hover:shadow-2xl rounded-xl overflow-hidden",
        "bg-white transition-all duration-100 dark:bg-gray-600",
        isVisible ? "animate-scale-in" : "opacity-0", // Aplica la animación si es visible.
    ].join(" ");

    return (
        <Card ref={cardRef} className={cardClasses}>
            <CardHeader
                floated={false}
                shadow={false}
                className="mx-auto mt-6 rounded-full object-cover object-center"
            >
                <img
                    src={avatar_url}
                    alt={`Avatar de ${login}`}
                    loading="lazy" // Carga diferida de la imagen.
                    className="h-40 w-40 rounded-full object-cover object-center shadow-md"
                />
            </CardHeader>
            <CardBody className="text-center">
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 dark:text-white"
                >
                    {login}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver el perfil de ${login} en Github`}
                >
                    <Button
                        color="amber"
                        size="lg"
                        className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                        fullWidth={true}
                    >
                        Profile Github
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
});

// Asignar un nombre para mostrar en las herramientas de desarrollo de React.
UserCard.displayName = "UserCard";

UserCard.propTypes = {
    user: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
        html_url: PropTypes.string,
    }).isRequired,
};

export default UserCard;
