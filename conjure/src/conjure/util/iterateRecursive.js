export function iterateParentsWithFunction(obj, func)
{
    if(!obj || !func) return;
    func(obj);
    if(obj.parent === null) return;
    if(obj.parent.type === 'Scene') return;
    if(!obj.parent) return;
    if(obj.parent)
    {
        this.iterateParentsWithFunction(obj.parent, func);
        func(obj.parent);
    }
}

export function iterateChildrenWithFunction(obj, func)
{
    if(!obj || !func) return;
    func(obj);
    if(!obj.children) return;
    if(obj.children.length === 0) return;
    for(let child of obj.children)
    {
        this.iterateChildrenWithFunction(child, func);
        func(child);
    }
}

export async function iterateParentsWithFunctionAsync(obj, func)
{
    if(!obj || !func) return;
    await func(obj);
    if(obj.parent === null) return;
    if(obj.parent.type === 'Scene') return;
    if(!obj.parent) return;
    if(obj.parent)
    {
        await this.iterateParentsWithFunction(obj.parent, func);
        await func(obj.parent);
    }
}

export async function iterateChildrenWithFunctionAsync(obj, func)
{
    if(!obj || !func) return;
    await func(obj);
    if(!obj.children) return;
    if(obj.children.length === 0) return;
    for(let child of obj.children)
    {
        await this.iterateChildrenWithFunction(child, func);
        await func(child);
    }
}