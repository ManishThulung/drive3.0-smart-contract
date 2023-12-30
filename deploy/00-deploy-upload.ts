import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { network } from "hardhat"
import { verify } from "../utils/verify"

/**
 * * Important Notes
 *
 * * In order to run `npx hardhat deploy --typecheck` command we need to add `import hardhat-deploy` in `hardhat.config.js` file.
 *
 */

const deployUpload: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()

  const chainId = network.config.chainId!

  const args: any[] = []

  const upload: DeployResult = await deploy("Upload", {
    from: deployer,
    log: true,
    args,
    waitConfirmations: chainId == 31337 ? 1 : 6,
  })

  // * only verify on testnets or mainnets.
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(upload.address, args)
  }
}

export default deployUpload
deployUpload.tags = ["all", "main"]
