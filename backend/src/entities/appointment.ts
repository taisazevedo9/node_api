export interface IAppointment {
  id: string;
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
export class Appointment {
  private props!: IAppointment;

  constructor(props: IAppointment) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error("Start date must be in the future");
    }

    if (endsAt.getTime() <= startsAt.getTime()) {
      throw new Error("End date must be after start date");
    }
    this.props = props;
  }
  get id() {
    return this.props.id;
  }
  get customer() {
    return this.props.customer;
  }
  get startsAt() {
    return this.props.startsAt;
  }
  get endsAt() {
    return this.props.endsAt;
  }
}
