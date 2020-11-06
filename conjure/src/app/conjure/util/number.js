export function number(num)
{
    var num = Number(num)
    return isNaN(num) ? 0 : num
}