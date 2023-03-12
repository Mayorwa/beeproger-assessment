interface IconInterface {
    name: string
    viewBox?: string
}
export const Icon = ({name, viewBox}: IconInterface) => {
    return (
        <>
            <svg className="icon" width="14px" height="14px" viewBox={viewBox ? viewBox : "0 0 24 24"}><use xlinkHref={`/sprite.svg#icon-${name}`}/></svg>
        </>
    )
}