type Props = {
  selectedSlot: string;
  setSelectedSlot: (slot: string) => void;
};

export default function AppointmentSlot({ selectedSlot, setSelectedSlot }: Props) {
  const morningSlots = [
    '09:30 AM – 09:45 AM',
    '10:00 AM – 10:15 AM',
    '10:30 AM – 10:45 AM',
    '11:00 AM – 11:15 AM',
  ];

  const eveningSlots = ['01:00 PM – 01:15 PM', '01:30 PM – 01:45 PM'];

  const renderSlots = (slots: string[]) =>
    slots.map((slot, idx) => (
      <button
        key={idx}
        onClick={() => setSelectedSlot(slot)}
        className={`text-sm rounded-md py-2 px-3 ${
          selectedSlot === slot
            ? 'bg-[#00D2FF] text-white'
            : 'bg-gray-200 text-black hover:bg-gray-300'
        }`}
      >
        {slot}
      </button>
    ));

  return (
    <div>
      <h4 className="font-semibold mb-2">Morning Slots</h4>
      <div className="grid grid-cols-2 gap-2 mb-4">{renderSlots(morningSlots)}</div>

      <h4 className="font-semibold mb-2">Evening Slots</h4>
      <div className="grid grid-cols-2 gap-2">{renderSlots(eveningSlots)}</div>
    </div>
  );
}

