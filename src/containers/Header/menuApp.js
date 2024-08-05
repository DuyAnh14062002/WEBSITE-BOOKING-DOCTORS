export const adminMenu = [
  {
    name: "admin.user",
    menus: [
      {
        name: "admin.manage-user",
        link: "/system",
      },
      {
        name: "admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    name: "admin.clinic",
    menus: [
      {
        name: "admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    name: "admin.Speciality",
    menus: [
      {
        name: "admin.manage-speciality",
        link: "/system/manage-speciality",
      },
    ],
  },
  {
    name: "admin.handbook",
    menus: [
      {
        name: "admin.manage-handbook",
        link: "/system",
      },
    ],
  },
];
export const DoctorMenu = [
  {
    name: "admin.user",
    menus: [
      {
        name: "doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "doctor.manage-booking",
        link: "/doctor/manage-booking",
      },
    ],
  },
];
