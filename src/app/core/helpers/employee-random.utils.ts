import { Employee } from "../../modules/dashboard/shared/model/employee.model";
import { GROUP_LIST } from "../../shared/global.const";

export const generateRandomEmployee = (index:number): Employee => {
  const firstNames = ['Adi', 'Budi', 'Charlie', 'Darto', 'Eminem', 'Sarah', 'David', 'Mora', 'Daniel', 'Laura'];
  const lastNames = ['Pasti', 'Surya', 'Kencana', 'Wijaya', 'Salim', 'Tanjung', 'Puspita', 'Bunga', 'Tania'];
  const groups = GROUP_LIST;
  const statusOptions = ['Active', 'Inactive'];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomGroup = groups[Math.floor(Math.random() * groups.length)];
  const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const randomSalary = 50000 + Math.floor(Math.random() * 50000);

  return {
      username: `user${index + 1}`,
      firstName: randomFirstName,
      lastName: randomLastName,
      email: `user${index}@example.com`,
      birthDate: new Date(`1990-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`),
      basicSalary: randomSalary,
      status: randomStatus,
      group: randomGroup,
      description: `${randomGroup} User`
  };
};
