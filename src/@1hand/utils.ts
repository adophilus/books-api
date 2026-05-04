import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import slugify from 'slugify';

export function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function truncateDate(date: Date): Date {
  const truncated = new Date(date);
  truncated.setHours(0, 0, 0, 0);
  return truncated;
}

export function parseDateAsLocalMidnight(input: string): Date {
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${input}`);
  }
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
}

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hash du mot de passe:', error);
    throw new Error('Erreur lors du hash du mot de passe');
  }
};

export const generateMatricule = (role: string): string => {
  // Année sur 2 chiffres
  const year = new Date().getFullYear().toString().slice(-2);

  // Code rôle (3 lettres)
  const roleCode =
    {
      SUPER_ADMIN: 'ADM',
      SCHOOL_ADMIN: 'SCH',
      TEACHER: 'TCH',
      PARENT: 'PAR',
      STUDENT: 'STD',
      SCHOOL: 'SH',
      ACADEMIC_LEVEL: 'AL',
      SCHOOL_TEACHER: 'TE',
      ACADEMIC_YEAR: 'AY',
      SCHOOL_CLASS: 'CL',
      SCHOOL_TAUGHT_SUBJECT: 'TS',
      PAYMENT_CONFIG: 'PC',
      STUDENT_PAYMENT: 'SP',
      PAYMENT_DISCOUNT: 'PD',
      AUTHOR: 'AUT',
      BOOK: 'BOK',
      VIDEO: 'VID',
      BOOK_VIEW: 'BKV',
      VIDEO_VIEW: 'VDV',
      BOOK_COMMENT: 'BKC',
      VIDEO_COMMENT: 'VDC',
    }[role] || 'E';

  // Générer 4 caractères alphanumériques
  const unique = randomBytes(2).toString('hex').toUpperCase();

  return `${year}${roleCode}${unique}`;
};

export const extractUserProfile = (account: any) => {
  const profile: any = {
    id: account.id,
    username: account.username,
    email: account.email,
    role: account.role,
    firstName: account.firstName,
    lastName: account.lastName,
    gender: account.gender,
    photo: account.photo,
    birthDate: account.birthDate,
    emailConfirmed: account.emailConfirmed,
    lastLogin: account.lastLogin,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    matricule: account.matricule,
    phoneNumber: account.phoneNumber,
    city: account.city,
    region: account.region,
    blocked: account.blocked,
    lockedUntil: account.lockedUntil,
    notes: account.notes,
    // Include all user permissions
    userPermissions: account.userPermissions || [],
    // Include all role permissions
    rolePermissions: account.rolePermissions || [],
    // Include schools if available
    schools: account.schools || [],
  };

  // Extract schools from role-specific relations
  let schools = [];

  // Add role-specific information and extract schools
  switch (account.role) {
    case 'SUPER_ADMIN':
      profile.schoolAdmin = account.schoolAdmin
        ? {
            id: account.schoolAdmin.id,
            matricule: account.schoolAdmin.matricule,
          }
        : null;
      if (account.schoolAdmin?.schools) {
        schools = account.schoolAdmin.schools;
      }
      break;
    case 'SCHOOL_ADMIN':
      profile.schoolAdmin = account.schoolAdmin
        ? {
            id: account.schoolAdmin.id,
            matricule: account.schoolAdmin.matricule,
          }
        : null;
      if (account.schoolAdmin?.schools) {
        schools = account.schoolAdmin.schools;
      }
      break;
    case 'TEACHER':
      profile.teacher = account.teacher
        ? { id: account.teacher.id, matricule: account.teacher.matricule }
        : null;
      if (account.teacher?.schools) {
        schools = account.teacher.schools.map((ts) => ts.school);
      }
      break;
    case 'STUDENT':
      profile.student = account.student
        ? { id: account.student.id, matricule: account.student.matricule }
        : null;
      if (account.student?.schools) {
        schools = account.student.schools;
      }
      break;
    case 'PARENT':
      profile.parent = account.parent
        ? { id: account.parent.id, matricule: account.parent.matricule }
        : null;
      if (account.parent?.schools) {
        schools = account.parent.schools;
      }
      break;
    default:
      break;
  }

  // Add schools to profile
  profile.schools = schools;

  return profile;
};

export const getSlug = (title: string) => {
  return slugify(title, { lower: true });
};
