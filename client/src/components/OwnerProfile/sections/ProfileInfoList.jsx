import { Mail, Calendar, User, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const ProfileInfoList = ({ user }) => {
  const { email, birthdate } = user;
  const formattedBirthdate = birthdate
    ? format(parseISO(birthdate), "d 'de' MMMM 'de' yyyy", { locale: es })
    : "Agregar fecha de nacimiento";

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-lg">
      <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
        <Mail className="w-6 h-6 text-cyan-400" />
        <span>{email}</span>
      </div>
      <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
        <Calendar className="w-6 h-6 text-cyan-400" />
        <span>Fecha de nacimiento: {formattedBirthdate}</span>
      </div>
      <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
        <User className="w-6 h-6 text-cyan-400" />
        <span>Edad: 23 años</span>
      </div>
      <div className="flex items-center gap-3 bg-[#1f1f23] p-4 rounded-xl border border-[#2c2c30]">
        <Users className="w-6 h-6 text-cyan-400" />
        <span>23 amigos</span>
      </div>
    </div>
  );
};

export default ProfileInfoList;
