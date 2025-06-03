const formatError = (error: unknown, context = ''): Error => {
    //si el error es una instancia de Error comun nos dara el error.message
    if (error instanceof Error) {
        return new Error(`${context}${error.message}`);
    }
    return new Error(`${context}An unknown error occurred`);
}

export default formatError;