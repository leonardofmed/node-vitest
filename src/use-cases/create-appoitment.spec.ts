import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appoitment";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create an appointment", () => {
    it("should be able to create an appointment", () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment =  new CreateAppointment(appointmentsRepository);
            
        const startDate = new Date();
        const endDate = new Date();
        startDate.setDate(startDate.getDate() + 2);
        endDate.setDate(endDate.getDate() + 5);

        
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate
        })).resolves.toBeInstanceOf(Appointment);
    });

    
    it("should not be able to create an appointment with overlapping dates", async () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment =  new CreateAppointment(appointmentsRepository);
            
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() + 2);
        endDate.setDate(endDate.getDate() + 5);

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate
        });
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() + 3);
        endDate.setDate(endDate.getDate() + 8);
        
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate
        })).rejects.toBeInstanceOf(Error); 
            
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 3);
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate
        })).rejects.toBeInstanceOf(Error);
    });
});