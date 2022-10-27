{ pkgs }: {
	deps = [
		pkgs.sudo
  pkgs.neofetch
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}