import chalk from 'chalk'

export default function warn (...msg: unknown[]) {

	msg.forEach(value => {

		console.log(
			chalk.bgBlack.bold.whiteBright(
					JSON.stringify(value, null, 2)
			)
		)

	})

}

