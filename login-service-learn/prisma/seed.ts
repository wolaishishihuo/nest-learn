import permission from './modules/permission';
import role from './modules/role';
import user from './modules/user';

async function main() {
  await role();
  await permission();
  await user();
}
main();
