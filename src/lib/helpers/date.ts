export const bday = '2005-03-10'

export const getAge = () => {
    const diffMs = Date.now().valueOf() - new Date(bday).valueOf();
    const diffDate = new Date(diffMs);
    return Math.abs(diffDate.getUTCFullYear() - 1970);
}