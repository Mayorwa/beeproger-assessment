export const Loader = (props: { display: string }) => {
    return (
        <div className="text-center" style={{paddingTop: '20vh'}}>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <h4>Loading {props.display}</h4>

            <p>This shouldn't take a while.</p>
        </div>
    );
};
