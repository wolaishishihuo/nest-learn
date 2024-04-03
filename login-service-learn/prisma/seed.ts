import permission from './modules/permission';
import user from './modules/user';
import userPermission from './modules/userPermission';

async function main() {
  await user();
  await permission();
  await userPermission();
}
main();
