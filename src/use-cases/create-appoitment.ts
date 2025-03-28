import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest  {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
    constructor(
        private appointmentsRepository: AppointmentsRepository
    ) {} 

    async execute({
        customer, 
        startsAt, 
        endsAt
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointment = await this.appointmentsRepository.findOverlapping(startsAt, endsAt);
        if (overlappingAppointment) {
            throw new Error('There is already an appointment in this time range');
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        });

        await this.appointmentsRepository.create(appointment);

        return appointment;
    }
}