export interface AppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    private props: AppointmentProps;

    get customer() {
        return this.props.customer;
    }

    get startsAt() {
        return this.props.startsAt;
    }

    get endsAt() {
        return this.props.endsAt;
    }

    constructor(props: AppointmentProps) {
        const { customer, startsAt, endsAt } = props;

        if (!customer || customer.trim() === '') {
            throw new Error('Customer cannot be empty');
        }

        if (startsAt <= new Date()) {
            throw new Error('Start date must be after now');
        }

        if (endsAt <= startsAt) {
            throw new Error('End date must be after start date');
        }

        this.props = props;
    }
}