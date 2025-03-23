import { expect, test } from 'vitest'
import { Appointment } from './appointment';

test('create an appointment', () => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 2);

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt: startDate,
        endsAt: endDate
    });
    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toBe('John Doe');
});

test('cannot create an appointment with an empty customer', () => {
    const startDate = new Date();
    const endDate = new Date();

    endDate.setDate(endDate.getDate() + 1);

    expect(() => new Appointment({
        customer: '',
        startsAt: startDate,
        endsAt: endDate
    })).toThrow();
});

test('cannot create an appointment with a start date after the end date', () => {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() - 1);
    endDate.setDate(endDate.getDate() + 3);

    expect(() => new Appointment({
        customer: 'John Doe',
        startsAt: startDate,
        endsAt: endDate
    })).toThrow();
});

// TODO
// test('cannot create an appointment with invalid dates', () => {

// });


// Cannot create and appointment with start date before now