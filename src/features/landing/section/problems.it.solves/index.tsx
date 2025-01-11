import ArrowIcon from './arrow.icon';
import NoteIcon from './note.icon';
import SlowIcon from './slow.icon';
import TimeIcon from './time.icon';

function ProblemSection() {
  return (
    <div className="flex flex-col items-center gap-10 rounded-3xl bg-orange-elevation-2 p-6">
      <h2 className="max-w-[22ch] text-center text-3xl font-bold leading-none text-orange-text-primary lg:text-4xl ">
        Most Announcements Do not reach students on time
      </h2>
      <Without />
    </div>
  );
}

export default ProblemSection;

function Without() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex sm:flex-row lg:gap-2">
      <div className="flex flex-col items-center">
        <NoteIcon className="h-[108] w-[98] lg:h-[189] lg:w-[173]" />
        <h3 className="max-w-[20ch] text-center text-xl font-bold text-orange-text-primary lg:text-3xl">
          ugly and Inconsistent writing
        </h3>
        <h4 className="text-center text-lg font-bold text-green-text-primary lg:text-xl">
          supercharge your writing with AI
        </h4>
      </div>
      <ArrowIcon />
      <div className="flex flex-col items-center">
        <TimeIcon className="h-[108] w-[104] lg:h-[193] lg:w-[187]" />
        <h3 className="max-w-[20ch] text-center text-xl font-bold text-orange-text-primary lg:text-3xl">
          Schedules Overlapping
        </h3>
        <h4 className="text-center text-lg font-bold text-green-text-primary lg:text-xl">
          try our robust scheduling system
        </h4>
      </div>
      <ArrowIcon />
      <div className="flex flex-col items-center">
        <SlowIcon className="h-[102] w-[108] lg:h-[192] lg:w-[200]" />
        <h3 className="max-w-[20ch] text-center text-xl font-bold text-orange-text-primary lg:text-3xl">
          ugly and Inconsistent writing
        </h3>
        <h4 className="text-center text-lg font-bold text-green-text-primary lg:text-xl">
          supercharge your writing with AI
        </h4>
      </div>
    </div>
  );
}
