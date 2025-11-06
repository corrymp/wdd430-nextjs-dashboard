import { State } from '@/app/lib/actions';

const ErrorItem = ({error}: {error: string}) => <p className='mt-2 text-sm text-red-500'>{error}</p>;

export function ErrorList({id, state, errType }: {id:string; state: State; errType?: 'customerId' | 'amount' | 'status'; }) {
    let errors;
    if(errType && state.errors?.[errType]) errors = state.errors[errType];
    else errors = [state.message];

    return (
        <div id={id} aria-live='polite' aria-atomic='true'>
            {errors?.map(error => error && <ErrorItem error={error} key={error} />)}   
        </div>
    );
};
