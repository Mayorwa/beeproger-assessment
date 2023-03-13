import {Icon} from "../Icon";
export const LoadingError = (props: { display: string, }) => {

    return (
        <section className="text-center" style={{paddingTop: '20vh'}}>
            <h1 className="text-danger"><Icon name="internet-not-available" viewBox="0 0 61 100"/></h1>
            <h4 className="text-danger">{props.display}</h4>
            <p>Reloading the page most times fixes this.</p>

        </section>
    );
};
